"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import PropTypes from "prop-types";

function Collapsible({ ...props }) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

Collapsible.propTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function CollapsibleTrigger({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

CollapsibleTrigger.propTypes = {
  asChild: PropTypes.bool,
};

function CollapsibleContent({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

CollapsibleContent.propTypes = {
  forceMount: PropTypes.bool,
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };