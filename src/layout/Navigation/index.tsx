import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import NavItem from './NavItem/NavItem';
import { SwipeableDrawer } from '@mui/material';
import { getColors } from '../Theme/themes';

export interface MiniDrawerProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void;
    setShowOutlet: (showOutlet: boolean) => void;
    isNonMobile: boolean;
    navConfig: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    }[];
    APP_BAR: string;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ isSidebarOpen, navConfig, setShowOutlet ,isNonMobile}) => {
    // const [active, setActive] = React.useState("/");

    return (
        <>
                <SwipeableDrawer
                ModalProps={{
                    keepMounted: false,
                  }}
                  PaperProps={{
                    sx: {
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      marginTop: "70px",
                      width: 180,
                      marginLeft: 1,
                      borderRadius: 4,
                      height: "75%",
                      paddingBottom:"40px",
                      background: getColors().primary[900] 
                    },
                  }}
                    variant="persistent"
                    open={isSidebarOpen}
                    onClose={(event) => console.log(event)}
                    onOpen={(event) => console.log(event)}
                >
                    <Divider />
                    <List>
                        {navConfig.map((item, index) => (
                            <NavItem
                                key={index}
                                isNonMobile={isNonMobile}
                                item={item}
                                isSidebarOpen={isSidebarOpen}
                                setShowOutlet={setShowOutlet}
                                // active={active}
                                // setActive={setActive}
                            />
                        ))}
                    </List>
                    <Divider />
                </SwipeableDrawer>
        </>
    );
};

export default MiniDrawer;