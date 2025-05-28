const CurrencyFormatter = (props : { amount : number }) => {
    const formatCurrency = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(props.amount);
  
    return <span>{formatCurrency}</span>;
  };

export default CurrencyFormatter