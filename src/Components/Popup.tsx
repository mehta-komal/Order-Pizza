import React, { FC } from "react";
import { Dialog, DialogContent, Typography, CardMedia } from "@mui/material";

interface Variety {
  name: string;
  description: string;
  origin: string;
  strength: string;
  discount?: number;
  price: number;
  image: string;
}

interface PopupProps {
  variety: Variety | null;
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ variety, onClose }) => {
  const displayPrice = (variety: Variety | null): string => {
    if (variety && typeof variety.price === 'string') {
      return `${variety.price}`;
    }
    return 'Invalid price';
  };

  return (
    <Dialog
      open={!!variety}
      onClose={onClose}
      maxWidth="md"
      classes={{ paper: "popup-paper" }}
    >
      <CardMedia
        component="img"
        image={variety?.image}
        alt={variety?.name}
        className="popup-image"
      />
      <DialogContent className="popup-box">
        <Typography variant="h6" className="popup-heading">
          {variety?.name}
        </Typography>
        <Typography variant="body2" className="popup-text">
          {variety?.description}
        </Typography>
        <Typography variant="body2" className="popup-text">
          <span>Origin:</span> {variety?.origin}
        </Typography>
        <Typography variant="body2" className="popup-text">
          <span>Strength:</span> {variety?.strength}
        </Typography>
        <Typography variant="body2" className="popup-text-p">
          Price: ₹{displayPrice(variety)}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
