package com.motoo.db.entity;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class StringArrayConverter implements AttributeConverter<List<String>, String> {

    private static final String SPLIT_CHAR = ", ";

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        String result = attribute.toString();
        return result;
    }

    @Override
    public List<String> convertToEntityAttribute(String data){
        data = data.substring(1,data.length()-1);
        List array1 = Arrays.stream(data.split(SPLIT_CHAR))
                .collect(Collectors.toList());
        return array1;
    }
}
