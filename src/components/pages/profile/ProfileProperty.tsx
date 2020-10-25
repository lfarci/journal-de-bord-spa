import React from "react";

interface IProfilePropertyProps {
    /**
     * The label should describe the represented property. It is shown as the
     * primary text.
     */
    label: string;
    /**
     * The value is associated to a property and is optional. It is shown as
     * a secondary text under the label.
     */
    value?: string;
    /**
     * Is an action rendering an icon. The icon is used to describe an action
     * related to the label.
     */
    renderIcon?: () => any;
    /**
     * Action called when this property is clicked.
     */
    onClick?: () => void;
}

/**
 * This component is used to display one of the properties in a profile
 * section.
 */
function ProfileProperty(props: IProfilePropertyProps) {

    const Icon = props.renderIcon!!;

    const hasClickAction = () => props.onClick !== undefined;
    const getClickAction = () => hasClickAction() ? props.onClick : () => {};
    const showValue = (): boolean => props.value !== undefined;
    const showIcon = (): boolean => props.renderIcon !== undefined;
    const getClassName = (): string => hasClickAction() ? "profile-property clickable" : "profile-property";

    return <div className={getClassName()} onClick={getClickAction()}>
        <div className="profile-property-header">
            <p className="primary-text">{props.label}</p>
            {showValue() && <p className="secondary-text">{props.value}</p>}
        </div>
        {showIcon() && <Icon />}
    </div>;
}

export default ProfileProperty;