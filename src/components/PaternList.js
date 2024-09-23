import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

function PaternList() {
  return (
    <div>
      <h4>以下面白い形集</h4>
      <List>
        <ListItem>
          <ListItemText primary="グライダー銃" />
          <Button>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="銀河" />
          <Button>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="ペンタデカスロン" />
          <Button>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="シュシュポッポ列車" />
          <Button>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="宇宙船" />
          <Button>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="長寿型（どんぐり）" />
          <Button>セルに反映</Button>
        </ListItem>
      </List>
    </div>
  );
}

export default PaternList;
