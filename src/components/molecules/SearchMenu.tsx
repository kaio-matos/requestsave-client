import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import {
  FormControl,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  ListSubheader,
  InputLabel,
  listItemSecondaryActionClasses,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { currencyBRLformatter } from './Grid/MoneyFormat'
import { Box } from '@mui/system'

type SearchMenuProps = {
  label: string
  items: any[]
  nameKey: string
  idKey: string
  field: ControllerRenderProps<any, any>
}

export default function SearchMenu({ label, items, nameKey, idKey, field }: SearchMenuProps) {
  const [filteredItems, setFilteredItems] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const divInput = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (items) setFilteredItems(items)
  }, [items])

  useEffect(() => {
    if (!items) return
    const filteredArray = items.filter((item) => item[nameKey].includes(search))
    setFilteredItems(filteredArray)
  }, [search])

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const search = event.currentTarget.value
    setSearch(search)
    event.currentTarget.focus()
  }

  return (
    <FormControl
      sx={{ display: 'flex', justifyContent: 'space-between' }}
      margin="normal"
      variant="outlined"
      fullWidth
      required
    >
      <InputLabel id={label}>{label}</InputLabel>
      <Select labelId={label} label={label} {...field}>
        <ListSubheader
          onClick={(e) => e.stopPropagation()}
          // Cancelamos o efeito de seleção em um item ao apertarmos alguma letra
          onKeyDown={(e) => e.stopPropagation()}
        >
          <TextField
            variant="outlined"
            required
            ref={divInput}
            fullWidth
            autoComplete="off"
            name="search"
            id="search"
            value={search}
            onChange={handleSearch}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </ListSubheader>

        {filteredItems.map((item) => (
          <MenuItem
            onFocus={() => {
              const search = divInput.current?.children[0].children[1] as HTMLInputElement
              search?.focus()
            }}
            className="searchMenu-items"
            key={item[idKey]}
            value={item[idKey]}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item[nameKey]} </span>
              &nbsp;&nbsp;
              <span>
                {item['basePrice'] ? (
                  <small>Preço base {currencyBRLformatter.format(Number(item['basePrice']))}</small>
                ) : (
                  ''
                )}
              </span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
