import Link from "next/link";
import classes from "./main-navigation.module.css";

interface NavigationProps {
  currentUser?: any;
}

function MainNavigation({ currentUser }: NavigationProps) {
  // console.log(currentUser, "current user");
  return (
    <header className={classes.header}>
      <Link href="/" legacyBehavior>
        <a>
          <div className={classes.logo}>TicketIt</div>
        </a>
      </Link>
      <nav>
        <ul>
          {currentUser ? (
            <li>
              <Link href="/auth">SignOut</Link>
            </li>
          ) : (
            <li>
              <Link href="/auth">Signin</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
