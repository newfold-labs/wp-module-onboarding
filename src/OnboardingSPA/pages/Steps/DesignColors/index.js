import CommonLayout from "../../../components/Layouts/Common";
import { VIEW_DESIGN_COLORS } from "../../../../constants";
import { store as nfdOnboardingStore } from "../../../store";
import { useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

const StepDesignColors = () => {
	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened } =
		useDispatch(nfdOnboardingStore);
	useEffect(() => {
		setIsSidebarOpened(false);
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_DESIGN_COLORS);
	}, []);
	return <CommonLayout></CommonLayout>;
};

export default StepDesignColors;
