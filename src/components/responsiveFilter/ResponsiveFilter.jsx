import { Tab, Tabs, Typography } from '@mui/material'
import { Box } from 'lucide-react'
import React from 'react'

export default function ResponsiveFilter() {
  return (
    <Box sx={{ width: 250, p: 2 }}>
    
    <Box sx={{ display: "flex", gap: "4px" }}>
      <Box component="img" src={filter} />
      <Typography fontWeight="bold">Filter</Typography>
    </Box>
    <Box mt={3}>
      <Typography fontWeight="bold">CATEGORIES</Typography>

      <Tabs
        orientation="vertical"
        value={categoryValue}
        onChange={handleCategoryChange}
      >
        {category?.data?.response?.data?.map((cat) => (
          <Tab key={cat.id} label={cat.name} />
        ))}
      </Tabs>
    </Box>

    {/* SORT */}
    <Box mt={3}>
      <Typography fontWeight="bold">SORT BY</Typography>

      <Tabs
        orientation="vertical"
        value={sortValue}
        onChange={handleSortChange}
      >
        {sortOptions.map((option, index) => (
          <Tab key={index} label={option.label} />
        ))}
      </Tabs>
    </Box>

  </Box>
  )
}
