// Material
import { Box } from '@mui/material'

// Organisms
import ProductForm from '@components/organisms/Product/ProductForm'
import ProductTable from '@components/organisms/Product/ProductTable'

// Style Object
import panelClasses from './style'

export default function ProductsPanel() {
  return (
    <Box sx={panelClasses.panelContainer}>
      <ProductForm />
      <ProductTable />
    </Box>
  )
}
