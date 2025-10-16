const CurrencyFormatter = (props : { amount : number }) => {
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.amount);
  
    return <span>{formatCurrency}</span>;
  };

export default CurrencyFormatter