const CurrencyFormatter = ({ amount, lineThrough=false } : { amount : number; lineThrough? : boolean }) => {
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
    return <span className={lineThrough ? "line-through text-gray-400 text-2xl lg:text-4xl" : ""}>{formatCurrency}</span>;
  };

export default CurrencyFormatter