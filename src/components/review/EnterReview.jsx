import { useState } from 'react';
import { Box, InputBase, Button, Typography, Rating, Select, MenuItem, Avatar, Divider } from '@mui/material';
import useReview from '../../hooks/useReview';
import * as React from 'react';

export default function ReviewInput({ product }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(null);
  const [sort, setSort] = useState("newest");
  const [showCount,setShowCount]=useState(4);
  console.log(product)
  const { mutate, isLoading, isSuccess, isError, error } = useReview(product.id);
console.log(mutate)
  const handleSubmit = () => {
    if (!comment.trim() || rating === null) return;
    mutate(
      { rating, comment },
      {
        onSuccess: () => {
          setComment('');
          setRating(null);
        },
        onError: (error) => {
          console.log("🔥", error.response?.data);
        }
      }
    );
  };
  const sortedReviews = [...(product?.reviews || [])].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });
  
  return (
    <Box>
      <Box mb={1}>
        <Rating
          name="review-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          border: '1px solid #E8ECEF',
          borderRadius: '12px',
          px: 2,
          py: 1,
          bgcolor: '#fff',
        }}
      >
        <InputBase
          fullWidth
          placeholder="Write your review…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          sx={{ fontSize: 15, fontFamily: 'Inter, Helvetica' }}
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading || rating === null}
          variant="contained"
          sx={{
            bgcolor: '#141718',
            color: '#fff',
            borderRadius: '20px',
            fontFamily: 'Inter, Helvetica',
            fontWeight: 500,
            fontSize: 14,
            textTransform: 'none',
            px: 2.5,
            py: 1,
            whiteSpace: 'nowrap',
            '&:hover': { bgcolor: '#2d2f30' },
            '&:disabled': { bgcolor: '#000', color: '#fff' },
          }}
        >
          {isLoading ? 'Sending…' : 'Write Review'}
        </Button>
      </Box>
      {isSuccess && (
        <Typography fontSize={13} color="success.main" mt={1} ml={1}>
          Review submitted, thank you!
        </Typography>
      )}
      {isError && (
        <Typography fontSize={13} color="error" mt={1} ml={1}>
          {error?.response?.data?.message }
        </Typography>
      )}

     


        <Box sx={{ maxWidth: "800px", margin: "auto", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography fontSize={"28px"} fontWeight="medium" fontFamily={"Poppins"}>
         {product.reviews.length} Reviews 
        </Typography>

        <Select size="small" value={sort}
            onChange={(e) => setSort(e.target.value)}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>
      {sortedReviews.slice(0,showCount).map((review, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          
          <Box sx={{ display: "flex", gap: 2 }}>
           
            <Avatar src={review.avatar} />

            <Box>
              <Typography fontWeight="bold">
                {review.userName}
              </Typography>

              <Rating value={review.rating} readOnly size="small" />

              <Typography
                sx={{ mt: 1, color: "gray", fontSize: "14px" }}
              >
                {review.comment}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography
                  component="span"
                  sx={{ mr: 2, fontSize: "13px", cursor: "pointer" }}
                >
                  Like
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: "13px", cursor: "pointer" }}
                >
                  Reply
                </Typography>
              </Box>
            </Box>
          </Box>
          {index !== sortedReviews.length - 1 && (
            <Divider sx={{ mt: 2 }} />
          )}
        </Box>
      ))}

{showCount < sortedReviews.length && (
  <Box sx={{ textAlign: "center", mt: 3 }}>
    <Button
      onClick={() => setShowCount(prev => prev + 3)}
      variant="outlined"
      sx={{
        borderRadius: "20px",
        px: 4,
        textTransform: "none"
      }}
    >
      Load more
    </Button>
  </Box>
)}
    </Box>
    </Box>
  );
}