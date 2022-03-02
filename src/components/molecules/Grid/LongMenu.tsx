import { MouseEvent, ReactNodeArray, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useBoolean } from '@hooks/useBoolean'

const ITEM_HEIGHT = 48

export default function LongMenu({ children }: { children: ReactNodeArray }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [show, setShow] = useBoolean(false)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (children.length === 0) return
    setAnchorEl(event.currentTarget)
    setShow.on()
  }
  const handleClose = () => {
    setAnchorEl(null)
    setShow.off()
  }

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={show ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={show}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {children}
      </Menu>
    </>
  )
}
