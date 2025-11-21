import clsx from "clsx";
import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { Headline } from "../atoms/Headline";
import { Button } from "../atoms/Button";
import { useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import Backdrop from "../atoms/Backdrop";
import { NavigationBar } from "../atoms/NavigationBar";
import { USER_CAPACITY_CITIZEN, USER_CAPACITY_EMPLOYEE } from "../../utilities/constants/api";

type LoginModalProps = {
  classes?: string;
  title: string;
  loginCitizenOrCompanyText: string;
  loginEmployeeText: string;
};

const styling = {
  root:
    "bg-white p-6 flex flex-col items-center w-96 fixed z-20 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2",
  title: "pb-1",
  text: "text-grey-dark inline",
  buttonContainer: "flex flex-col gap-4 mt-8 w-full max-w-[24rem]",
  button: "w-full",
};

const LoginModal = ({ classes, title, loginCitizenOrCompanyText, loginEmployeeText, ...rest }: LoginModalProps) => {
  const { loginSettings, setLoginSettings, doLogin } = useAppConfigContext();
  const smallDevice = useMediumDeviceDown();
  const className = clsx(styling.root, classes);

  const hideModal = () => setLoginSettings((prev) => ({ ...prev, showLoginModal: false }));

  function login(loginAs: number) {
    const containsRedirectUri = window.location.href.includes("redirectUri");

    if (containsRedirectUri) {
      const searchParams = new URL(window.location.href).searchParams;
      const redirectUri = searchParams.get("redirectUri");
      doLogin(redirectUri || "", loginAs);
    } else if (loginSettings?.redirectUri !== null) {
      doLogin(loginSettings.redirectUri, loginAs);
    } else {
      doLogin(window.location.href, loginAs);
    }
  }

  if (!loginSettings.showLoginModal) {
    return null;
  }

  return (
    <div aria-modal="true" role="dialog">
      <Backdrop show={true} onClick={hideModal} />
      <Card rounded classes={className}>
        {smallDevice ? (
          <Title type="heavy" classes={styling.title}>
            {title}
          </Title>
        ) : (
          <Headline type="heavy" classes={styling.title}>
            {title}
          </Headline>
        )}
        <NavigationBar fixed={false} classes={styling.buttonContainer}>
          <Button onClick={() => login(USER_CAPACITY_CITIZEN)} classes={styling.button}>
            {loginCitizenOrCompanyText}
          </Button>
          <Button onClick={() => login(USER_CAPACITY_EMPLOYEE)} classes={styling.button}>
            {loginEmployeeText}
          </Button>
        </NavigationBar>
      </Card>
    </div>
  );
};

export { LoginModal };
export type { LoginModalProps };
