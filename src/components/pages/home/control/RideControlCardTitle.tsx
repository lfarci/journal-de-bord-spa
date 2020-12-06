import React from "react";
import { Typography } from "@material-ui/core";

const humanizeDuration = require("humanize-duration");

interface IComputedTitleProps {
    locationName?: string;
    trackingMilliseconds: number;
}

interface IBaseTitleProps {
    /**
     * If a text is specified and not empty then the locationName and
     * trackingMilliseconds props are ignored.
     */
    text?: string;
}

declare type IRideControlCardTitleProps = IComputedTitleProps | IBaseTitleProps;

function toHumanReadableDuration(milliseconds: number): string {
    // Options description are available here: https://www.npmjs.com/package/humanize-duration
    // Note: negative are ignored
    return humanizeDuration(milliseconds, {
        round: true,
        units: ['d', 'h', 'm'],
        largest: 1,
    });
}

export function computeStatusTitle(locationName: string, trackingMilliseconds: number) {
    const name = locationName.toLowerCase();
    const duration = toHumanReadableDuration(trackingMilliseconds);
    return locationName.length == 0
        ? `You left ${duration} ago`
        : `You left ${name} ${duration} ago`;
}

export function BaseTitle(props: IBaseTitleProps) {
    return <Typography variant="h6">{props.text}</Typography>
}

export function ComputedTitle(props: IComputedTitleProps) {
    const getName = () => props.locationName === undefined ? "" : props.locationName;
    const text = computeStatusTitle(getName(), props.trackingMilliseconds);
    return <BaseTitle text={text} />;
}

export default function RideControlCardTitle(props: IRideControlCardTitleProps) {
    const isBaseTitle = () => "text" in props;
    if (isBaseTitle()) {
        return <BaseTitle {... (props as IBaseTitleProps)} />
    } else {
        return <ComputedTitle {... (props as IComputedTitleProps)} />
    }
}