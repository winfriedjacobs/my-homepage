interface DiscProps {
    fill?: string;
    width?: number;
    height?: number;
    className?: string;
    cy?: number;
}

export const DiscIcon = (
    {
        fill,
        width = 20,
        height = 20,
        className,
        cy=0
    }: DiscProps
) => {
    return (
        <svg
          width="150"
          height="150"
          viewBox="0 0 100 100"
          className="bg-slate-700 rounded-xl shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*
            The circle element is the disc.
            - cx="50" and cy="50" center the circle within the 100x100 viewBox.
            - r="20" sets the radius to 20 units, which correspond to 20 pixels in our 150x150 display.
            - fill and stroke define the colors of the disc.
          */}
          <circle
            cx="60"
            cy={cy}
            r="20"
            fill={fill} // A nice blue color
            stroke="#3B82F6" // A darker blue for the border
            strokeWidth="2"
          />
        </svg>
    )
}