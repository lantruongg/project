import { Drawer, Checkbox } from "antd";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
const DrawExpand = forwardRef((props, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = (event) => {
    setIsChecked(event.target.checked);
    props.onCheckChange(event.target.checked);
  };
  return (
    <Drawer
      title="TERMS AND CONDITIONS"
      placement="right"
      onClose={props.onClose}
      open={props.open}
    >
      <p>1. Acceptance of Terms:</p>
      <p>
        By accessing and using this web-enabled role-based system, you agree to
        these Terms and Conditions. If you do not agree to these Terms and
        Conditions, please do not use the system.
      </p>
      <p>2. Use of the System</p>
      <p>
        This web-enabled role-based system is designed to collect ideas for
        improvement from staff in a large University. Users are required to
        submit ideas through this system. Any other use of this system is
        prohibited.
      </p>
      <p>3. User Accounts</p>
      <p>
        Users must create an account in order to submit ideas. The user account
        is unique to each user and is not transferable. Users are responsible
        for maintaining the confidentiality of their account information and
        password.
      </p>
      <p>4. Submission of Ideas</p>
      <p>
        By submitting an idea through this system, you represent and warrant
        that the idea is original and has not been previously submitted. You
        also grant the University a non-exclusive, perpetual, irrevocable,
        royalty-free, worldwide license to use, copy, modify, distribute, and
        display the idea.
      </p>
      <p>5. User Conduct</p>
      <p>
        Users are responsible for their conduct while using this system. Users
        must not use this system to submit ideas that are unlawful, harmful,
        threatening, abusive, harassing, defamatory, vulgar, obscene, invasive
        of another's privacy, or otherwise objectionable. Users must also not
        use this system to impersonate another person or entity, or falsely
        state or otherwise misrepresent their affiliation with a person or
        entity.
      </p>
      <p>6. System Security</p>
      <p>
        Users must not attempt to gain unauthorized access to this system or any
        part of it, including the accounts of other users. Users must not use
        this system to distribute viruses, malware, or any other harmful
        computer code.
      </p>
      <p>7. Indemnification</p>
      <p>
        Users agree to indemnify and hold harmless the University, its officers,
        employees, and agents, from any claims, damages, or expenses (including
        attorney's fees) arising from their use of this system.
      </p>
      <p>8. Disclaimer of Warranties</p>
      <p>
        This system is provided on an "as is" and "as available" basis. The
        University makes no representations or warranties of any kind, express
        or implied, as to the operation of this system or the information,
        content, materials, or products included on this system.
      </p>
      <p>9. Limitation of Liability</p>
      <p>
        The University will not be liable for any damages of any kind arising
        from the use of this system, including, but not limited to, direct,
        indirect, incidental, punitive, and consequential damages.
      </p>
      <p>10. Modification of Terms and Conditions</p>
      <p>
        The University reserves the right to modify these Terms and Conditions
        at any time. Users will be notified of any changes to these Terms and
        Conditions via email or through the system.
      </p>
      <p>
        By clicking "I Agree" or using this system, you acknowledge that you
        have read, understood, and agree to these Terms and Conditions.
      </p>
      <Checkbox onChange={handleCheckChange} checked={isChecked}>
        I agree to the Terms and Conditions of Greenwich Feed
      </Checkbox>
    </Drawer>
  );
});
export default DrawExpand;
