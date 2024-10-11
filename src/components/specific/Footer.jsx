
const Footer = () => {
  return (
    <div className="bg-orange-500 py-10 px-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl text-white text-cente font-bold tracking-tight">
                SnackIt.com
            </h1>
            <p className="text-center text-white font-bold tracking-tight flex gap-4">
                &copy; 2021 SnackIt.com. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer