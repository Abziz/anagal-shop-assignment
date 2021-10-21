
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className="w-full  flex-auto h-full max-h-full overflow-y-auto">
				<div className="container mx-auto min-h-full flex flex-col">
					{children}
				</div>
			</main>
		</>
	);
};

export default Layout;
