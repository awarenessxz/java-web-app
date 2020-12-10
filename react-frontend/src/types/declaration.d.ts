// defining global type for importing gif files
declare module '*.gif' {
    const value: string;
    export default value;
}

// defining global type for scss files
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}
