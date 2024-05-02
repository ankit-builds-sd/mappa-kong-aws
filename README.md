Test

Kong is a modeling Library and Framework. It allows users to create Models based on a certain set of conventions.
It is made up of the following components:

- Input
    - Models
- Library
    - Model Schema
    - Code Generator
        output is generated code
    - Invoker
        dynamic programming algorithm, used for efficiently calculating quantities
    - Unit Test Suite
    - Tracer (calc tree)
- Framework
    - Runner
        - accepts a Model
        - API definition
        - Webserver (express)
    - Editor
        - Manual
        - VS code extension
        - Mesh
            A GUI used to edit, build, test and run a model

Usage of Kong in the SD+ context

Build Phase
    Algorithm Authors will use Editors (VSCode Extension + Mesh) to manage models.
    SD+ will represent all Business Logic in 1 single Model, which will a composition of other Models:
        - Energy
            RenewableSources
                SPV
                SWH
        - Water
            CurrentWaterTable
            Demand Optimisation
                CRO
                Efficient Fixtures
            Reuse
                GreyWaterReuse
                BlackWaterReuse
        - IGBC
        - Paints
            Interior Paints
            Exterior Paints
        - sdplus-v1
            SustainabilityLevel
            Energy
            Water
            Waste
            Materials
Deploy Phase
    Dev team will deploy a specific version of a model to AWS / Heroku, and run it using the Kong Runner Framework
    Calculess will call Kong's runner API (/result?calctree=true, body)
    Once calculess receives results from Kong, it will wrap the values in a metadata object