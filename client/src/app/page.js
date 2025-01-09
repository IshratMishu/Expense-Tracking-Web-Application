import AddExpense from "@/components/AddExpense";
import Navbar from "@/components/Navbar";
import SummaryPage from "@/components/SummaryPage";


export default function Home() {
  return (
    <div>
     <Navbar></Navbar>
     <AddExpense></AddExpense>
     <SummaryPage></SummaryPage>
    </div>
  );
}
