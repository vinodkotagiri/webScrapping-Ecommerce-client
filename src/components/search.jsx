import React, { useEffect, useState } from 'react'
import {
	Button,
	Stack,
	OutlinedInput,
	Pagination,
	Divider,
	Box,
} from '@mui/material'
import axios from 'axios'
import ItemsList from './itemsList'
import usePagination from './hook.pagnation'
const Search = () => {
	// -----------------------------------------------------------------------------
	// SET STATES FOR THE PRODUCTS
	// -----------------------------------------------------------------------------
	const [product, setProduct] = useState('')
	const [data, setData] = useState([])

	// -------------------------------------------------------------------------
	// LOAD DATA FROM DATABASE ON INITAILIZATION
	// -------------------------------------------------------------------------
	const getData = async () => {
		await axios
			.get('http://localhost:12000/')
			.then((response) => setData(response.data))
	}
	useEffect(() => {
		getData()
	}, [setData])

	// -------------------------------------------------------------------------
	// HANDLE SEARCH FUNCTIONALITY
	// -------------------------------------------------------------------------
	const handleSearch = async () => {
		await axios
			.post('http://localhost:12000/', { product: product })
			.then((response) => setData(response.data))
	}
	// -------------------------------------------------------------------------
	// HANDLE PAGNATION
	// -------------------------------------------------------------------------
	let [page, setPage] = useState(1)
	const PER_PAGE = 10
	const count = Math.ceil(data.length / PER_PAGE)
	const _DATA = usePagination(data, PER_PAGE)
	const handleChange = (e, p) => {
		setPage(p)
		_DATA.jump(p)
	}

	return (
		<>
			<Stack
				direction='row'
				gap={3}
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '2rem',
				}}>
				<OutlinedInput
					placeholder='Enter Product to search'
					sx={{ width: '75%' }}
					onChange={(e) => setProduct(e.target.value)}
					value={product}
				/>
				<Button variant='contained' onClick={handleSearch}>
					Search
				</Button>
			</Stack>

			<Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
				<Pagination
					count={count}
					size='large'
					page={page}
					variant='outlined'
					shape='rounded'
					onChange={handleChange}
				/>
			</Box>
			<Divider />
			<Stack
				direction='row'
				sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
				{_DATA.currentData().map((product) => (
					<ItemsList
						key={product._id}
						image={product.image}
						title={product.title}
						actualPrice={product.price}
						offerPrice={product.offerPrice}
						link={product.link}
						rating={product.rating}
						source={product.source}
					/>
				))}
			</Stack>
			<Divider />
			<Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
				<Pagination
					count={count}
					size='large'
					page={page}
					variant='outlined'
					shape='rounded'
					onChange={handleChange}
				/>
			</Box>
		</>
	)
}

export default Search
