import styles from "./Layout.module.scss";
import { Footer, Header } from "../components";
import { ILayoutProps } from "./Layout.props";

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};


