import React from 'react'
import { Typography, Paper, Rating, Box } from '@mui/material'
const ItemsList = ({
	image,
	title,
	actualPrice,
	offerPrice,
	link,
	rating,
	source,
}) => {
	return (
		<Paper
			sx={{
				maxWidth: '375px',
				padding: '0.5rem',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				margin: '0.25rem',
				overflow: 'hidden',
			}}>
			<Box>
				<img src={image} alt='product-img' />
			</Box>
			<Box sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
				<a href={link} target='_blank' rel='noreferrer'>
					<Typography variant='h4'>{title}</Typography>
				</a>
				<Typography>{source}</Typography>
				<Typography variant='h5'>{offerPrice}</Typography>
				<Typography
					variant='p'
					sx={{ color: '#616161', textDecoration: 'line-through' }}>
					{actualPrice}
					<br />
				</Typography>
				<Rating defaultValue={rating} readonly precision={0.5} />
				<Typography>{rating}</Typography>
			</Box>
		</Paper>
	)
}

export default ItemsList
