/**
 * This represents the progress of a driver.
 */
export type Progress = {
    /**
     * This is the total number of kilometers driven so far. This value should
     * be positive.
     */
    drivenDistance: number;
    /**
     * This is the number of kilometers that the driver wants to drive in
     * total.
     */
    distanceObjective: number;
}