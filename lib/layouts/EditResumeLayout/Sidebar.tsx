import { Box, Drawer } from '@mui/material';
import HeaderTitle from '@lib/components/HeaderTitle';
import styles from './styles';

export interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  const { children } = props;
  return (
    <Box sx={styles.sidebarWrapper}>
        {/* <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer> */}
      <Drawer variant="permanent" sx={styles.drawerWrap} open>
      <Box sx={styles.logoBox}>
        <HeaderTitle />
      </Box>
      {children}
      </Drawer>
    </Box>
  )
}

export default Sidebar