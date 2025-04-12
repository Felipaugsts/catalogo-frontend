const Rating = (item) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <input key={item.index + item.value + star} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled aria-label="2 star" defaultChecked={false} />
      ))}
    </div>
  );
};

export default Rating;
