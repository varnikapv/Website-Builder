// import React from 'react'
// import { appPlans } from '../assets/assets';
// import Footer from '../components/Footer';
// import { authClient } from '@/lib/auth-client';
// import { toast } from 'sonner';
// import api from '@/configs/axios';

// interface Plan {
//   id: string;
//   name: string;
//   price: string;
//   credits: number;
//   description: string;
//   features: string[];
// }


// const Pricing = () => {
//   const {data: session} = authClient.useSession()
//   const [plans] = React.useState<Plan[]>(appPlans)
//   const handlePurchase = async (planId: string) => {
//   try {
//     if(!session?.user) return toast('Please login to purchase credits')
    
//     console.log('🔍 Sending planId:', planId); // Debug
//     console.log('🔍 Session:', session?.user); // Debug
    
//     const {data} = await api.post('/api/user/purchase-credits', {planId})
    
//     console.log('✅ Response data:', data); // Debug
//     console.log('✅ Payment link:', data.payment_link); // Debug
    
//     if (data.payment_link) {
//       window.location.href = data.payment_link;
//     } else {
//       toast.error('No payment link received');
//     }
//   } catch(error: any){
//     console.error('❌ Error details:', error); // Debug
//     console.error('❌ Error response:', error?.response); // Debug
//     toast.error(error?.response?.data?.message || error.message);
//   }
// }
//   return (
//     <>
//       <div className='w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh]'>
//         <div className='text-center mt-16'>
//           <h2 className='text-gray-100 text-3xl font-medium'>Choose Your Plan</h2>
//           <p className='text-gray-400 text-sm max-w-md mx-auto mt-2'>Select the plan that best fits your needs and start building your website today.</p>
//         </div>
//         <div className='pt-14 py-4 px-4 '>
//         <div className='grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4'>
//                     {plans.map((plan, idx) => (
//                             <div key={idx} className="p-6 bg-black/20 ring ring-indigo-950 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg hover:ring-indigo-500 transition-all duration-400">
//                                 <h3 className="text-xl font-bold">{plan.name}</h3>
//                                 <div className="my-2">
//                                     <span className="text-4xl font-bold">{plan.price}</span>
//                                     <span className="text-gray-300"> / {plan.credits} credits</span>
//                                 </div>

//                                 <p className="text-gray-300 mb-6">{plan.description}</p>

//                                 <ul className="space-y-1.5 mb-6 text-sm">
//                                     {plan.features.map((feature, i) => (
//                                         <li key={i} className="flex items-center">
//                                             <svg className="h-5 w-5 text-indigo-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                                                 stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                             </svg>
//                                             <span className="text-gray-400">{feature}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <button onClick={() => handlePurchase(plan.id)} className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-sm rounded-md transition-all">
//                                     Buy Now
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <p className='mx-auto text-center text-sm max-w-md mt-10 text-white/60 font-light'>Project 
//                 <span className='text-white'> Creation / Revision </span> consume <span className='text-white'>5 credits</span>. You can purshase more credits to
//                  create more projects</p>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default Pricing




import { appPlans } from '../assets/assets';
import Footer from '../components/Footer';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import api from '@/configs/axios';


const Pricing = () => {
  const {data: session} = authClient.useSession()
  
  const handlePurchase = async (planId: string) => {
    console.log('🚀 BUTTON CLICKED! Plan ID:', planId); // This should show first
    
    try {
      if(!session?.user) {
        toast('Please login to purchase credits');
        return;
      }
      
      console.log('✅ User is logged in');
      console.log('📤 Sending request to backend...');
      
      const {data} = await api.post('/api/user/purchase-credits', {planId});
      
      console.log('📥 Response received:', data);
      
      if (data.payment_link) {
        console.log('🔗 Redirecting to:', data.payment_link);
        window.location.href = data.payment_link;
      } else {
        console.error('❌ No payment link in response');
        toast.error('No payment link received');
      }
    } catch(error: any) {
      console.error('❌ ERROR:', error);
      console.error('❌ ERROR RESPONSE:', error?.response);
      toast.error(error?.response?.data?.message || error.message);
    }
  }
  
  return (
    <>
      <div className='w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh]'>
        <div className='text-center mt-16'>
          <h2 className='text-gray-100 text-3xl font-medium'>Choose Your Plan</h2>
          <p className='text-gray-400 text-sm max-w-md mx-auto mt-2'>Select the plan that best fits your needs and start building your website today.</p>
        </div>
        <div className='pt-14 py-4 px-4 '>
          <div className='grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4'>
            {appPlans.map((plan, idx) => (
              <div key={idx} className="p-6 bg-black/20 ring ring-indigo-950 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg hover:ring-indigo-500 transition-all duration-400">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="my-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-300"> / {plan.credits} credits</span>
                </div>

                <p className="text-gray-300 mb-6">{plan.description}</p>

                <ul className="space-y-1.5 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-indigo-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('🎯 CLICK EVENT FIRED');
                    handlePurchase(plan.id);
                  }} 
                  className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-sm rounded-md transition-all"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
        <p className='mx-auto text-center text-sm max-w-md mt-10 text-white/60 font-light'>
          Project <span className='text-white'> Creation / Revision </span> consume <span className='text-white'>5 credits</span>. You can purchase more credits to create more projects
        </p>
      </div>
      <Footer />
    </>
  )
}

export default Pricing