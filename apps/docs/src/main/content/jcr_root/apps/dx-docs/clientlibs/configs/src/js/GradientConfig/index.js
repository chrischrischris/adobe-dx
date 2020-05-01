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

import React, { useEffect, useState } from "react";
import Button from "@react/react-spectrum/Button";
import ButtonGroup from "@react/react-spectrum/ButtonGroup";
import { Form, FormItem } from "@react/react-spectrum/Form";
import Textfield from "@react/react-spectrum/Textfield";
import Select from "@react/react-spectrum/Select";
import GradientPicker from "react-gpickr";

const DEFAULT_STATE = {
  data: {
    "jcr:primaryType": "nt:unstructured",
    configKey: "dx-gradient",
  },
  replace: true,
};

const DEFAULT_SWATCHES = [];

const GradientConfig = (props) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    if (props.config.data) {
      const { name, data } = props.config;
      setConfig({ name, data, replace: true, cleanName: name });
    } else {
      setConfig(DEFAULT_STATE);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(config).length) props.setConfig(config);
  }, [config]);

  const onNameChange = (name) => {
    setConfig({ ...config, name });
  };

  const cleanName = (value) => {
    return value.replace(/\W/g, "");
  };

  const onContentChange = (value, e) => {
    const updatedConfig = { data: config.data };
    updatedConfig.data[e.target.name] = value;
    if (e.target.name === "text" && props.mode === "new") {
      updatedConfig.name = cleanName(value);
    }
    setConfig({ ...config, ...updatedConfig });
  };

  return (
    <>
      <Form>
        <FormItem label="Name">
          <Textfield
            disabled
            name="name"
            value={config.name}
            placeholder="name"
            onChange={onNameChange}
          />
        </FormItem>
        <FormItem label="Text">
          <Textfield
            name="text"
            value={config.data && config.data.text}
            placeholder="Text"
            onChange={onContentChange}
          />
        </FormItem>
      </Form>
      <GradientPicker />
    </>
  );
};

export default GradientConfig;
