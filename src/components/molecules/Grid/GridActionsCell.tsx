import { MouseEvent, useState } from 'react'

import { IconButton, Modal, Box, Typography, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Delete, Edit } from '@mui/icons-material'
import { GridApi, GridRowId } from '@mui/x-data-grid'

// Utils / Contexts
import { useGlobalMessage } from '@contexts/MessageContext'

// Hooks
import { useBoolean } from '@hooks/useBoolean'

// Types
import { ValidationError } from 'yup'
import { useQueryDeleteMutateType, useQueryEditMutateType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'
import { APIErrorI } from '@type/API'

type RowMenuProps = {
  api: GridApi
  id: GridRowId
  validations: {
    editValidation: (value: any) => Promise<true | ValidationError>
    deleteValidation: (value: any) => Promise<true | ValidationError>
  }
  editDocument: useQueryEditMutateType
  deleteDocument: useQueryDeleteMutateType
}

export default function GridActionsCell(props: RowMenuProps) {
  const { api, id, editDocument, deleteDocument, validations } = props
  const { setMessage } = useGlobalMessage()
  const [showModal, setShowModal] = useBoolean(false)
  const isInEditMode = api.getRowMode(id) === 'edit'

  /**
   * Começa a edição
   */
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    api.setRowMode(id, 'edit')
  }

  /**
   * Salva o item e retorna ao modo view da tabela
   */
  const handleSaveClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    // Pegamos a linha antiga, então atualizamos ela e pegamos a nova linha
    const oldRow = api.getRow(id)
    api.commitRowChange(id)
    const updatedRow = api.getRow(id)
    if (updatedRow === null) return

    // Apeans executa o restante caso os dados estiverem corretos
    const validation = await validations.editValidation(updatedRow)
    if (validation !== true) return setMessage({ message: validation.message, severity: 'error' })

    // Apenas executa o restante em caso de haver alteração
    if (JSON.stringify(oldRow) === JSON.stringify(updatedRow)) return api.setRowMode(id, 'view')

    try {
      const data = await editDocument(updatedRow as APIeditDocumentI)
      api.setRowMode(id, 'view')
      setMessage({ message: data.message, severity: 'success' })
    } catch (err) {
      const { response } = err as APIErrorI
      api.updateRows([{ ...oldRow }])
      setMessage({ message: response.data.meta.cause, severity: 'error' })
    }
  }

  const handleModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setShowModal.toggle()
  }
  /**
   * Deleta algum item
   */
  const deleteItem = async () => {
    const oldRow = api.getRow(id)

    try {
      const validation = await validations.deleteValidation({ id })
      if (validation !== true) return setMessage({ message: validation.message, severity: 'error' })

      const data = await deleteDocument({ id } as APIeditDocumentI)
      api.setRowMode(id, 'view')
      api.updateRows([{ id, _action: 'delete' }])
      setMessage({ message: data.message, severity: 'success' })
    } catch (err) {
      const { response } = err as APIErrorI
      api.updateRows([{ ...oldRow }])
      setMessage({ message: response.data.meta.cause, severity: 'error' })
    }
  }

  const handleCancelClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    api.setRowMode(id, 'view')
    const row = api.getRow(id)

    if (row!.isNew) {
      api.updateRows([{ id, _action: 'delete' }])
    }
  }

  // Muda os ícones e suas respectivas funções
  if (isInEditMode) {
    return (
      <>
        <IconButton color="primary" size="small" aria-label="save" onClick={handleSaveClick}>
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton color="inherit" size="small" aria-label="cancel" onClick={handleCancelClick}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </>
    )
  }
  return (
    <>
      <IconButton color="primary" size="small" aria-label="Editar" onClick={handleEditClick}>
        <Edit fontSize="small" />
      </IconButton>
      <IconButton color="inherit" size="small" aria-label="Deletar" onClick={handleModal}>
        <Delete fontSize="small" />
      </IconButton>

      <Modal open={showModal} onClose={() => {}}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '3px solid #47474741',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Você tem certeza que quer apagar este item?
          </Typography>
          <Box display="flex" sx={{ justifyContent: 'space-between' }}>
            <Button onClick={deleteItem} color="error" startIcon={<DeleteIcon color="error" />}>
              Apagar
            </Button>
            <Button onClick={handleModal} color="primary" startIcon={<ExitToAppIcon />}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
