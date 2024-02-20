import { isNotEmpty, lengthValidation } from "./helpers";

export function validateName(value) {
    return lengthValidation("name", value ? value.length : 0, 3, 30);
}



export function validatePlatformIds(values) {
    const errors = [];

    if (values) {
        values.forEach((platformObject, platformIndex) => {
            const { platformId } = platformObject;
            const platformIdError = {};
            platformIdError.platformId = validatePlatformId(platformId);
            errors[platformIndex] = platformIdError;
        });
        return errors;
    }
    return null;
}

export function validateValue(values) {
    const errors = [];
    if (values) {
        values.forEach((valueObject, valueIndex) => {
        console.log(valueObject);
        if(valueObject !== undefined){
         console.log("IS DEFINED");
        }else{
         console.log("IS UNDEFINED");
         errors[valueIndex] = "Add valid value";
        }
      });
        return errors;
    }
    return null;
}

function validatePlatformId(value) {
    const pattern = new RegExp('^[\\w-]{4,}$');

    if (!value)
        return "Please, enter a valid platform id";

    if (value && !pattern.test(value)) {
        return "From 4 to 30 characters. " +
            "Include only letters, digits, '-' and '_'. You can leave it empty for autogeneration";
    }

    if (value && value.length > 30) {
        return `Please lengthen the name to 30 characters or less (you are currently using
         ${value.length} characters).`;
    }

    return null;
}


export function validateOrganizations(values) {
    const errors = [];

    if (values) {
        values.forEach((platformObject, platformIndex) => {
            const { platformId } = platformObject;
            const platformIdError = {};
            platformIdError.platformId = validateOrganization(platformId);
            errors[platformIndex] = platformIdError;
        });
        return errors;
    }
    return null;
}

function validateOrganization(value) {
    const pattern = new RegExp('^[\\w-]{4,}$');

    if (!value)
        return "Please, enter a valid organization";

    if (value && !pattern.test(value)) {
        return "From 4 to 100 characters. " +
            "Include only letters, digits, '-' and '_'. You can leave it empty for autogeneration";
    }

    if (value && value.length > 100) {
        return `Please lengthen the name to 100 characters or less (you are currently using
         ${value.length} characters).`;
    }

    return null;
}

export function validateThreshold(value) {
    const isEmptyResult = isNotEmpty(value);

    if (isEmptyResult)
        return isEmptyResult;

    if (isNaN(value))
        return "This is not a valid number";

    return null;
}

export function validateDuration(value) {
    if (!value)
        return null;

    if (isNaN(value))
        return "This is not a valid number";

    return null;
}


export function validateQoSConstraints(values) {
    const errors = [];

    if (values) {
        values.forEach((qosConstraint, index) => {
            const { metric, comparator, threshold, duration } = qosConstraint;
            const qosConstraintError = {};

            qosConstraintError.metric = isNotEmpty(metric);
            qosConstraintError.comparator = isNotEmpty(comparator);
            qosConstraintError.threshold = validateThreshold(threshold);
            qosConstraintError.duration = validateDuration(duration);

            errors[index] = qosConstraintError;
        });
        return errors;
    }
    return null;
}

export function validateQofEsWeights(value) {
    if (!value)
        return null;

    if (isNaN(value))
        return "This is not a valid quality of experience weight";

    if (value < 0)
            return "This is not a valid quality of experience weight";

    if (value > 1)
        return "This is not a valid quality of experience weight";

    return null;
}

export function validatePercent(value) {
    if (!value)
        return null;

    if (isNaN(value))
        return "This is not a valid of Quality of service";

    if (value < 0)
            return "This is not a valid of Quality of service";

    if (value > 100)
        return "This is not a valid of Quality of service";

    return null;
}

