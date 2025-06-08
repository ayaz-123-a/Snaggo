import { useContext } from "react";
import MyContext from "../../../context/myContext";

const UserDetail = () => {
  const context=useContext(MyContext)
  const {getUser}=context
  
  return (
     <div>
       <div>
        <div className="py-5 flex justify-between items-center">
          {/* text  */}
          <h1 className=" text-xl text-black font-bold">All User Details</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
           <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-black">
           <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  S.No.
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                 Name
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >Email
                </th>
              </tr>
             { getUser.map((item,index)=>{
              if(item.role==='user'){
                return(
                  <tr className="text-pink-300" key={index}>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                  {index+1}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {item.name}
                </td>
                 <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {item.email}
                </td>
              </tr>
             )

              }else{
                <div className="flex items-center justify-center text-4xl h-screen text-red"><h1>There is No User</h1></div>
              }
          
          })}
            </tbody>          

          </table>
        

        </div>

      </div>
      </div>
    
   
 
 );
};

export default UserDetail;
