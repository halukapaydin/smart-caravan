import React, {useEffect, useState} from 'react';
import {Canvas, Circle, Group, Skia, Text as SkiaText, useFont} from "@shopify/react-native-skia";
import {area, scaleLinear} from "d3";
import {Text, View} from "react-native";

interface LiquidLevelIndicatorProps {
    value: number;
    size: number;
    color: string;
    label: string;
}

const LiquidLevelIndicator = (props: LiquidLevelIndicatorProps) => {
    const [value, setValue] = useState(props.value);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);


    const {size} = props;

    const radius = size * 0.5; // outer circle
    const circleThickness = radius * 0.05; // 0.05 just coefficient can be anything you like

    const circleFillGap = 0.05 * radius; // 0.05 just coefficient can be anything you like
    const fillCircleMargin = circleThickness + circleFillGap;
    const fillCircleRadius = radius - fillCircleMargin; // inner circle radius

    const minValue = 0; // min possible value
    const maxValue = 100; // max possible value
    const fillPercent = Math.max(minValue, Math.min(maxValue, value)) / maxValue; // percent of how much progress filled

    const waveCount = 1; // how many full waves will be seen in the circle
    const waveClipCount = waveCount + 1; // extra wave for translate x animation
    const waveLength = (fillCircleRadius * 2) / waveCount; // wave length base on wave count
    const waveClipWidth = waveLength * waveClipCount; // extra width for translate x animation
    const waveHeight = fillCircleRadius * 0.1; // wave height relative to the circle radius, if we change component size it will look same

    // Data for building the clip wave area.
    // [number, number] represent point
    // we have 40 points per wave
    // we generate as many points as 40 * waveClipCount
    const data: Array<[number, number]> = [];
    for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push([i / (40 * waveClipCount), i / 40]);
    }

    const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]); // interpolate value between 0 and 1 to value between 0 and waveClipWidth
    const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]); // interpolate value between 0 and 1 to value between 0 and waveHeight

    // area take our data points
    // output area with points (x, y0) and (x, y1)
    const clipArea = area()
        .x(function (d) {
            return waveScaleX(d[0]); // interpolate value between 0 and 1 to value between 0 and waveClipWidth
        })
        .y0(function (d) {
            // interpolate value between 0 and 1 to value between 0 and waveHeight
            return waveScaleY(
                Math.sin(d[1] * 2 * Math.PI),
            );
        })
        .y1(function (_d) {
            // same y1 value for each point
            return fillCircleRadius * 2 + waveHeight;
        });

    const clipSvgPath = clipArea(data); // convert data points as wave area and output as svg path string
    // @ts-ignore
    const clipPath = Skia.Path.MakeFromSVGString(clipSvgPath); // convert svg path string to skia format path
    const transformMatrix = Skia.Matrix(); // create Skia tranform matrix
    transformMatrix.translate(
        0, // translate x to 0, basically do nothing
        fillCircleMargin + (1 - fillPercent) * fillCircleRadius * 2 - waveHeight, // translate y to position where lower point of the wave in the innerCircleHeight * fillPercent
    );
    // @ts-ignore
    clipPath.transform(transformMatrix); // apply transform matrix to our clip path

    const fontSize = radius / 2; // font size is half of the radius
    const font = useFont( require("../../../assets/Roboto-Regular.ttf"), fontSize); // create font with font file and size

    const text = `${value}%`; // convert value to string
    const textWidth = font?.getTextWidth(text) ?? 0; // get text width
    const textTranslateX = radius - textWidth * 0.5; // calculate text X position to center it horizontally
    const textTransform = [{translateY: size * 0.5 - fontSize * 0.7}]; // calculate vertical center position. Half canvas size - half font size. But since characters isn't centered inside font rect we do 0.7 instead of 0.5.


    return (
        <View style={{display: "flex", gap: 5}}>
            <Canvas style={{width: size, height: size}}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - circleThickness * 0.5}
                    color={props.color}
                    style="stroke"
                    strokeWidth={circleThickness}
                />

                <Group clip={clipPath}>
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={fillCircleRadius}
                        color={props.color}
                    />

                </Group>
                <SkiaText
                    font={font}
                    x={textTranslateX}
                    y={fontSize}
                    text={text}
                    color={"#FFFFFF"}
                    transform={textTransform}
                />
            </Canvas>
            <Text style={{color: "#FFFFFF", textAlign: "center"}}>{props.label}</Text>
        </View>

    );
};
export default LiquidLevelIndicator;