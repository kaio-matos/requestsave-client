import { Dispatch, SetStateAction } from 'react'
import { standardError } from '@components/molecules/DisplayError'

import { Client } from '@api/Client'
import { Product } from '@api/Product'
import { Request } from '@api/Request'

// Types
import { ProductInterface } from '@type/models/Product'
import { RequestType } from '@type/models/Request'
import { ClientInterface } from '@type/models/Client'
import { errorInterface } from '@type/Error'

enum ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const ROLES_ARRAY = [
  { code: 'USER', type: 'Usuário' },
  { code: 'ADMIN', type: 'Administrador' },
]

enum STATUS {
  TODO = 'TODO',
  GRAPHIC = 'GRAPHIC',
  DEALING = 'DEALING',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

const STATUS_ARRAY = [
  { code: STATUS.TODO, type: 'A fazer', color: 'brown' },
  { code: STATUS.GRAPHIC, type: 'Gráfica', color: 'yellow' },
  { code: STATUS.DEALING, type: 'Negociando', color: 'blue' },
  { code: STATUS.CANCELLED, type: 'Cancelado', color: 'red' },
  { code: STATUS.COMPLETED, type: 'Completo', color: 'green' },
]

function randomStringCharacters(length: number) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const constants = {
  generateRandomClients() {
    let randomClients: {
      name: string
      email: string
    }[] = []

    function createRandomClient() {
      return {
        name: randomStringCharacters(6),
        email: randomStringCharacters(10) + '@hotmail.com',
      }
    }

    for (let i = 0; i < 100; i++) {
      randomClients = [...randomClients, createRandomClient()]
    }

    return randomClients
  },

  generateRandomProducts() {
    let randomProducts: {
      name: string
      basePrice: number
    }[] = []

    function createRandomProduct() {
      return {
        name: randomStringCharacters(6),
        basePrice: Number((Math.random() * 2000).toPrecision(2)),
      }
    }

    for (let i = 0; i < 100; i++) {
      randomProducts = [...randomProducts, createRandomProduct()]
    }

    return randomProducts
  },

  generateRandomRequests(client_id: string, product_id: string) {
    let randomRequests: {
      client_id: string
      expiresIn: Date
      paidOut: number
      price: number
      product_id: string
      status: STATUS
      title: string
    }[] = []

    function createRandomRequest() {
      const oneDay = 1000 * 60 * 60 * 24
      const plusOrMinus = Math.round(Math.random())
      let day = 0
      if (plusOrMinus) day = Date.now() + Math.random() * oneDay
      else day = Date.now() - Math.random() * oneDay

      return {
        client_id,
        expiresIn: new Date(day),
        paidOut: Number((Math.random() * 5).toPrecision(2)),
        price: Number((Math.random() * 50).toPrecision(2)),
        product_id,
        status: STATUS_ARRAY[Math.floor(Math.random() * 6)].code,
        title: randomStringCharacters(6),
      }
    }

    for (let i = 0; i < 100; i++) {
      randomRequests = [...randomRequests, createRandomRequest()]
    }

    return randomRequests
  },
}

const localeTableTranslationPTBR = {
  // Root
  noRowsLabel: 'Sem linhas',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',
  errorOverlayDefaultLabel: 'Um erro ocorreu.',

  columnMenuLabel: 'Opções',
  columnMenuShowColumns: 'Mostrar Colunas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Esconder',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Organizar ASC',
  columnMenuSortDesc: 'Organizar DESC',

  columnsPanelTextFieldLabel: 'Encontrar coluna',
  columnsPanelTextFieldPlaceholder: 'Título da coluna',
  columnsPanelDragIconLabel: 'Reordenar coluna',
  columnsPanelShowAllButton: 'Mostrar todos',
  columnsPanelHideAllButton: 'Esconder todos',

  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecionar colunas',

  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Esconder filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelDeleteIconLabel: 'Apagar filtro',
  filterPanelOperators: 'Operadores',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Coluna',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor do filtro',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'igual',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',

  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'depois',
  filterOperatorOnOrAfter: 'é em ou depois',
  filterOperatorBefore: 'antes',
  filterOperatorOnOrBefore: 'é em ou antes',

  filterOperatorIsEmpty: 'campo em branco',
  filterOperatorIsNotEmpty: 'campo não está em branco',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar como CSV',
}

export { STATUS, STATUS_ARRAY, ROLES, ROLES_ARRAY, localeTableTranslationPTBR, constants }
