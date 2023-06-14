import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function NestedList({title, items, selected=false}) {
  const [open, setOpen] = React.useState(selected);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%',  bgcolor: '#050e2d', color: "#686e80" }}
      component="nav"
      aria-labelledby={title}
    >
      <ListItemButton onClick={handleClick} style={open===true?{background: "#22a565", color: "white"}: {}}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit style={open===true?{background: "#1e2642", color: "white"}: {}}>
        <List component="div" disablePadding>
        {items.map((text, index) => (
          <ListItemButton key={index} sx={{ pl: 4 }}>
          <ListItemText primary={text} />
        </ListItemButton>
        ))}
        </List>
      </Collapse>
    </List>
  );
}