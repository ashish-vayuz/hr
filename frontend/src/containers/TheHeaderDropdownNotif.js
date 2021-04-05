import React from "react";
import { CDropdown, CDropdownMenu } from "@coreui/react";

const TheHeaderDropdownNotif = () => {
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownMenu placement="bottom-end" className="pt-0"></CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
