// import { logoutAccount } from "@/lib/actions/user.actions";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// function Footer({ user, type = "desktop" }: FooterProps) {
//     const handleLogout=async()=>{
//         const router= useRouter()
//        let  loggedout = await logoutAccount();
//        if(loggedout){
//         toast.success("Logged out successfully")
//         router.push("/sign-in")
//        }else{
//         toast.error("Failed to logout")
//        }
//     }
//   return (
//     <footer className="footer ">
//       <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
//         <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
//       </div>

//       <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
//         <h1 className="text-14 truncate  text-gray-700 font-semibold">{user?.name}</h1>
//         <p className="text-14 truncate font-normal text-gray-500 ">{user?.email}</p>
//       </div>
//       <div className="footer_image" onClick={handleLogout}>
//         <Image src="/icons/logout.svg" fill alt="jsm"/>
//       </div>
//     </footer>

//   );
// }

// export default Footer;


import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Footer({ user, type = "desktop" }: FooterProps) {
    // Move the useRouter hook to the top level of the component
    const router = useRouter();

    const handleLogout = async () => {
        let loggedout = await logoutAccount();
        if (loggedout) {
            toast.success("Logged out successfully");
            router.push("/sign-in");
        } else {
            toast.error("Failed to logout");
        }
    };

    return (
        <footer className="footer">
            <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
                <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
            </div>

            <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">{user?.name}</h1>
                <p className="text-14 truncate font-normal text-gray-500">{user?.email}</p>
            </div>
            <div className="footer_image" onClick={handleLogout}>
                <Image src="/icons/logout.svg" fill alt="jsm" />
            </div>
        </footer>
    );
}

export default Footer;
