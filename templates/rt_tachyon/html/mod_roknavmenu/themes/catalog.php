<?php

require_once(dirname(__FILE__).'/gantry-fusion/theme.php');
RokNavMenu::registerTheme(dirname(__FILE__).'/gantry-fusion','gantry-fusion', 'gantry-fusion', 'GantryFusionTheme');

require_once(dirname(__FILE__).'/gantry-splitmenu/theme.php');
RokNavMenu::registerTheme(dirname(__FILE__).'/gantry-splitmenu','gantry-splitmenu', 'gantry-splitmenu', 'GantrySplitmenuTheme');

require_once(dirname(__FILE__).'/splicemenu/theme.php');
RokNavMenu::registerTheme(dirname(__FILE__).'/splicemenu','splicemenu', 'splicemenu', 'SpliceMenuTheme');