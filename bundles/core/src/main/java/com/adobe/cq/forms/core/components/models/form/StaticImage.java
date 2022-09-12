/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2022 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.adobe.cq.forms.core.components.models.form;

import java.io.IOException;

import javax.jcr.RepositoryException;

import org.jetbrains.annotations.Nullable;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface StaticImage extends Field, BaseConstraint {

    /**
     * Returns the source where the image is present.
     *
     * @return the source where the image is present
     * @since com.adobe.cq.forms.core.components.models.form 0.0.1
     */
    @Nullable
    default String getImageSrc() throws RepositoryException, IOException {
        return null;
    }

    /**
     * Returns the alternate text in place of image.
     *
     * @return the alternate text in place of image
     * @since com.adobe.cq.forms.core.components.models.form 0.0.1
     */
    @Nullable
    default String getAltText() {
        return null;
    }

    /**
     * Returns the excluded from dor field of image.
     *
     * @return the excluded from dor of image
     * @since com.adobe.cq.forms.core.components.models.form 0.0.1
     */
    @Nullable
    default Boolean isExcludeFromDor() {
        return null;
    }

}
