# Writing CSS Modules

CSS Modules are a great way to locally scope CSS to a specific component. In this react component library, we combine two technologies (CSS Modules + SCSS) to write out styles for each component.

```
/* example.module.scss */

// Not the recommended way
.panel-version-1 {
    color: blue;
}

// Recommended Way
.panelVersion2 {
    color: red;
}
```

To use the stylesheet in the react component, refer to the codes below.

```
import styles from example.module.scss;

export const TestComponent = () => {
    return (
        <!-- It is possible to have hypens but it is best to avoid this -->
        <div className={styles['panel-version-1']}>
            <h1>I'm the test component</h1>
        </div>

        <!-- recommended way -->
        <div className={styles.panelVersion2}>
            <h1>I'm the test component</h1>
        </div>
    );
};
```

## References
- [How to write hypen in CSS Modules](https://medium.com/@hirodeath/how-to-write-hyphen-in-css-modules-639e53d6740a)
