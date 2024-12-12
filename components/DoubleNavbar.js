import { useState } from 'react';
import { Title, Tooltip, UnstyledButton, MantineLogo } from '@mantine/core';
import classes from './DoubleNavbar.module.css';

const mainLinksMockdata = [
    { label: 'Home' },
    { label: 'Favourite' },
    { label: 'Friends' },
    { label: 'Profile' },
    { label: 'Messages' },
    { label: 'Settings' },
    { label: 'Support' },
];

export function DoubleNavbar() {
    const [active, setActive] = useState('Home');

    const mainLinks = mainLinksMockdata.map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={classes.mainLink}
                data-active={link.label === active || undefined}
            >
                {link.label}
            </UnstyledButton>
        </Tooltip>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        <MantineLogo type="mark" size={30} />
                    </div>
                    {mainLinks}
                </div>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>
                </div>
            </div>
        </nav>
    );
}