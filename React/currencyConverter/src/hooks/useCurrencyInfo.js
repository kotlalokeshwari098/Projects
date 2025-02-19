import  {useEffect,useState} from "react"

// const currencyy="USD"
function useCurrencyInfo(currency){
      const [data,setData]=useState({})
      useEffect(()=>{
            const url="https://api.currencyapi.com/v3/latest?apikey=cur_live_qO0kmK1rIGdXrapSG1s2vcL81LEPmM1xghBZ2y5m"
            console.log(url);
            const fetchData = async () => {
                  try {
                        const response = await fetch(`${url}&base_currency=${currency}`);
                        const result = await response.json();
                        console.log("API Response:", result);
                        if (result.data) {
                          setData(result.data); // Updating state
                        }
                      } catch (error) {
                        console.error("Fetch Error:", error);
                      }
                    };

                    if (currency) fetchData();

   },[currency])
     // ✅ Use useEffect to track state updates
  useEffect(() => {
    console.log("Updated state:", data);
  }, [data]); // Runs whenever `data` changes

   return data
}
export default useCurrencyInfo