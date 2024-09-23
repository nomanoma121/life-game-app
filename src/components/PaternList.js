import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { generatePatern } from "../utils/patern";

function PaternList({passing}) {
  const [galaxy, gliderGun, spaceShip, pufferTrain, acorn, pentadecathlon] = generatePatern();
  return (
    <div>
      <h4>以下面白い形集</h4>
      <List>
        <ListItem>
          <ListItemText primary="グライダー銃" />
          <Button onClick={() => passing(gliderGun)}>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="銀河" />
          <Button onClick={() => passing(galaxy)}>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="ペンタデカスロン" />
          <Button onClick={() => passing(pentadecathlon)}>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="シュシュポッポ列車" />
          <Button onClick={() => passing(pufferTrain)}>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="宇宙船" />
          <Button onClick={() => passing(spaceShip)}>セルに反映</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="長寿型（どんぐり）" />
          <Button onClick={() => passing(acorn)}>セルに反映</Button>
        </ListItem>
      </List>
    </div>
  );
}

export default PaternList;
