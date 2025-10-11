"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import PropTypes from "prop-types";

function AspectRatio({ ...props }) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

AspectRatio.propTypes = {
  ratio: PropTypes.number,
  asChild: PropTypes.bool,
};

export { AspectRatio };