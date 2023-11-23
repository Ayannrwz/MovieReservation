const FormatDate = (inputDate) => {
    const date = new Date(inputDate);
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    // console.log(month,day,year);
  
    return `${year}-${month}-${day}`;
  }

  export default FormatDate;