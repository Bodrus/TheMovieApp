if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/bodrus/.gradle/caches/8.8/transforms/38d38cd36d0b69881dbd04dcdd90953c/transformed/hermes-android-0.75.2-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/bodrus/.gradle/caches/8.8/transforms/38d38cd36d0b69881dbd04dcdd90953c/transformed/hermes-android-0.75.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

