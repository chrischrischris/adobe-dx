/*
 *  Copyright 2020 Adobe
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import getCsrf from './csrf';

async function deleteResource(path) {
    const formData = new FormData();
    formData.append(':operation', 'delete');

    const csrf = await getCsrf();

    return await (fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'CSRF-Token': csrf.token },
        body: formData
    }));
}

export default deleteResource;