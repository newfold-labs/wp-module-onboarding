import IndexPage from ".";
import { Page } from "../../data/models/Page";

export const indexPage = new Page(
    {
		path: '/',
		title: '',
		Component: IndexPage,
		Icon: <></>,
	},
)