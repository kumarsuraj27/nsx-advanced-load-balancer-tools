import '@cds/core/icon/register.js';
import {
    ClarityIcons,
    userIcon,
    twoWayArrowsIcon,
    vmBugIcon,
    barsIcon,
    checkboxListIcon,
} from '@cds/core/icon';

const clarityIcons = [
    userIcon,
    checkboxListIcon,
    vmBugIcon,
    twoWayArrowsIcon,
    barsIcon,
]

ClarityIcons.addIcons(...clarityIcons);
