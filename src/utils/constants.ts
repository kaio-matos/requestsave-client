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
  filterOperatorContains: 'Contém',
  filterOperatorEquals: 'Igual',
  filterOperatorStartsWith: 'Começa com',
  filterOperatorEndsWith: 'Termina com',

  // Filter operators single select
  filterOperatorIs: 'É igual a',
  filterOperatorNot: 'Não é igual a',

  // Filter operators date
  filterOperatorAfter: 'Depois de',
  filterOperatorOnOrAfter: 'É em ou depois',
  filterOperatorBefore: 'Antes de',
  filterOperatorOnOrBefore: 'É em ou antes',

  // Filter operators generics
  filterOperatorIsEmpty: 'Campo em branco',
  filterOperatorIsNotEmpty: 'Campo não está em branco',
  filterOperatorIsAnyOf: 'É qualquer um de',

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

export { STATUS, STATUS_ARRAY, ROLES, ROLES_ARRAY, localeTableTranslationPTBR }
