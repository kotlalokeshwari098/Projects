import { useState,useEffect } from 'react'
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo"

function App() {
  const [amount,setAmount] = useState(0);
  const [from,setFrom]=useState("ALL");
  const [to,setTo]=useState("INR");
  const [convertedAmount,setConvertedAmount]=useState(0);
  const [options, setOptions] = useState([]);

  // from custom hook
 let currencyInfo=useCurrencyInfo(from)
  console.log(from)
  
useEffect(() => {
    console.log("Currency Info Updated:", currencyInfo);
    setOptions(Object.keys(currencyInfo)); 
}, [currencyInfo]); 
  
 

  console.log("hello");
  console.log("options are",options)
  
  const swap=()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert = () => {
    // Ensure you have the correct rate from currencyInfo object for the selected currencies
    const fromRate = currencyInfo[from].value; // Exchange rate for 'from' currency
    const toRate = currencyInfo[to].value; // Exchange rate for 'to' currency
    console.log('fromRate:', fromRate, 'toRate:', toRate);
  
    // If rates are not found, return or display an error
    const result = ((amount /fromRate) * toRate).toFixed(2);
  
  setConvertedAmount(result); // Set the calculated converted amount
  console.log("Converted Amount:", result);
}
  
   return (
    <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
    }}
>
    <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    convert()
                   
                }}
            >
                <div className="w-full mb-1">
                    <InputBox
                        label="From"
                        amount={amount}
                        currencyOptions={options}
                        onCurrencyChange={(currency) => setFrom(currency)}
                        selectCurrency={from}
                        onAmountChange={(amount) => setAmount(amount)}
                    />
                </div>
                <div className="relative w-full h-0.5">
                    <button
                        type="button"
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                        onClick={swap}
                    >
                        swap
                    </button>
                </div>
                <div className="w-full mt-1 mb-4">
                    <InputBox
                        label="To"
                        amount={convertedAmount}
                        currencyOptions={options}
                        onCurrencyChange={(currency) => setTo(currency)}
                        selectCurrency={to}
                        amountDisable
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" onClick={convert}>
                    Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
            </form>
        </div>
    </div>
</div>
);
}

export default App
